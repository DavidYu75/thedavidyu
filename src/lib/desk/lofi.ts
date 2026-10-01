/**
 * A short synthesized lo-fi loop for the headphones widget (Web Audio, no external audio).
 * Nothing plays until start() is called from a user gesture.
 */
export interface Lofi {
  start(): void;
  stop(): void;
  readonly running: boolean;
  elapsed(): number;
  readonly LOOP: number;
}

export function createLofi(): Lofi {
  let ac: AudioContext | null = null, master: GainNode | null = null, bus: GainNode | null = null;
  let timer = 0, nextT = 0, step = 0, running = false, t0 = 0;
  const BPM = 76, beat = 60 / BPM, stepLen = beat / 2, LOOP = stepLen * 32;
  const CH = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 59], [55, 59, 62, 66]];
  const MEL = [[76, 74, 72, 69], [72, 69, 67, 64], [71, 72, 74, 76], [74, 71, 69, 67]];
  const fq = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

  function tone(m: number, t: number, d: number, g: number, type: OscillatorType, det?: number) {
    const o = ac!.createOscillator(), v = ac!.createGain();
    o.type = type; o.frequency.value = fq(m); if (det) o.detune.value = det;
    v.gain.setValueAtTime(0, t); v.gain.linearRampToValueAtTime(g, t + 0.03); v.gain.exponentialRampToValueAtTime(0.0005, t + d);
    o.connect(v).connect(bus!); o.start(t); o.stop(t + d + 0.05);
  }
  function kick(t: number) {
    const o = ac!.createOscillator(), v = ac!.createGain();
    o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(38, t + 0.16);
    v.gain.setValueAtTime(0.55, t); v.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    o.connect(v).connect(bus!); o.start(t); o.stop(t + 0.3);
  }
  function noise(len: number, pow: number) {
    const b = ac!.createBuffer(1, Math.floor(ac!.sampleRate * len), ac!.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, pow);
    const n = ac!.createBufferSource(); n.buffer = b; return n;
  }
  function hat(t: number, g: number) {
    const n = noise(0.06, 3), hp = ac!.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 5500;
    const v = ac!.createGain(); v.gain.value = g; n.connect(hp).connect(v).connect(bus!); n.start(t);
  }
  function snare(t: number) {
    const n = noise(0.18, 2), bp = ac!.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 0.8;
    const v = ac!.createGain(); v.gain.value = 0.22; n.connect(bp).connect(v).connect(bus!); n.start(t);
  }
  function schedule() {
    if (!ac) return;
    while (nextT < ac.currentTime + 0.35) {
      const bar = Math.floor(step / 8) % 4, s8 = step % 8, ch = CH[bar], sw = s8 % 2 ? 0.06 : 0; const t = nextT + sw;
      if (s8 === 0) { ch.forEach((m, i) => { tone(m, t, beat * 3.7, 0.055, 'triangle', i % 2 ? -6 : 6); tone(m, t, beat * 3.7, 0.02, 'sine', 3); }); tone(ch[0] - 24, t, beat * 1.7, 0.2, 'sine'); }
      if (s8 === 4) tone(ch[0] - 24, t, beat * 1.3, 0.16, 'sine');
      if (s8 === 0 || s8 === 5) kick(t); if (s8 === 4) snare(t); hat(t, s8 % 2 ? 0.05 : 0.1);
      if (s8 === 2 || s8 === 6 || (s8 === 7 && bar % 2)) { const m = MEL[bar][((step >> 1) + bar) % 4]; tone(m, t, stepLen * 1.6, 0.06, 'sine'); tone(m, t, stepLen * 1.2, 0.025, 'triangle', -8); }
      nextT += stepLen; step++;
    }
  }
  function start() {
    if (!ac) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ac = new Ctor(); master = ac.createGain(); master.gain.value = 0.55;
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400; lp.Q.value = 0.7;
      const comp = ac.createDynamicsCompressor(); master.connect(lp).connect(comp).connect(ac.destination);
      // vinyl crackle
      const b = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() < 0.002 ? Math.random() * 2 - 1 : 0) * 0.6 + (Math.random() * 2 - 1) * 0.02;
      const n = ac.createBufferSource(); n.buffer = b; n.loop = true; const v = ac.createGain(); v.gain.value = 0.25; n.connect(v).connect(master); n.start();
    }
    // Each play gets a fresh bus, so notes scheduled before a pause can't sound over the restarted loop.
    bus = ac.createGain(); bus.connect(master!);
    ac.resume(); step = 0; nextT = ac.currentTime + 0.06; t0 = nextT; running = true; schedule();
    timer = window.setInterval(schedule, 90);
  }
  function stop() { running = false; clearInterval(timer); bus?.disconnect(); bus = null; if (ac) ac.suspend(); }
  return {
    start, stop,
    get running() { return running; },
    elapsed() { return ac ? Math.max(0, ac.currentTime - t0) : 0; },
    LOOP,
  };
}

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return localStorage.getItem('vidit_portfolio_sound') !== 'false';
}

export function setSoundEnabled(enabled) {
  localStorage.setItem('vidit_portfolio_sound', enabled ? 'true' : 'false');
}

// 1. Tick sound (soft decay sine wave)
export function playTick() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.warn('Audio play failure:', e);
  }
}

// 2. Click sound (clean round beep)
export function playClick() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn(e);
  }
}

// 3. Cut sound (Razor cut: noise + high-pass filter + fast decay)
export function playCut() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    
    // Generate brief white noise
    const bufferSize = ctx.sampleRate * 0.15; // 0.15 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Highpass filter to make it sound like a snip
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.Q.setValueAtTime(2, ctx.currentTime);

    // Gain envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start(ctx.currentTime);
    noiseNode.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.warn(e);
  }
}

// 4. Chime sound (Ascending triad: C5 - E5 - G5 - C6)
export function playChime() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.08);
      
      gainNode.gain.setValueAtTime(0.0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.08, startTime + idx * 0.08 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.08 + 0.25);
      
      osc.start(startTime + idx * 0.08);
      osc.stop(startTime + idx * 0.08 + 0.3);
    });
  } catch (e) {
    console.warn(e);
  }
}

// 5. Typing keyboard sound (very soft high freq ticks)
export function playKeyboard() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Randomize frequency slightly for natural keyboard feel
    const randomFreq = 1800 + Math.random() * 800;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(randomFreq, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Fail silently since typing is fast
  }
}

// 6. Error sound (low frequency double-buzz)
export function playError() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    const startTime = ctx.currentTime;
    
    [0, 0.12].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, startTime + delay); // Low buzz
      
      gainNode.gain.setValueAtTime(0.06, startTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + delay + 0.1);
      
      osc.start(startTime + delay);
      osc.stop(startTime + delay + 0.12);
    });
  } catch (e) {
    console.warn(e);
  }
}

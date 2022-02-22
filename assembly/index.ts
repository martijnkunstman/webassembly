// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function multiply(a: i32, b: i32): i32 {
  return a * b;
}

export function hypot(a: f64, b: f64): f64
{
  return Math.sqrt(a*a + b*b)
}

//-----------------------------------

var width  = 320;
var height = 320;

// Let's utilize the entire heap as our image buffer
export const offset = __heap_base;

/** Sets a single pixel's color. */
function set(x: i32, y: i32, v: f32): void {
  var vi = <i32>v;
  store<i32>(offset + ((width * y + x) << 2), ~vi << 24 | vi << 8);
}

/** Computes the distance between two pixels. */
function distance(x1: i32, y1: i32, x2: f32, y2: f32): f32 {
  var dx = <f32>x1 - x2;
  var dy = <f32>y1 - y2;
  return Mathf.sqrt(dx * dx + dy * dy);
}

/** Performs one tick. */
export function update(tick: f32): void {
  var w = <f32>width;
  var h = <f32>height;
  var hw = w * 0.5,
      hh = h * 0.5;
  var cx1 = (Mathf.sin(tick * 2) + Mathf.sin(tick      )) * hw * 0.3 + hw,
      cy1 = (Mathf.cos(tick)                            ) * hh * 0.3 + hh,
      cx2 = (Mathf.sin(tick * 4) + Mathf.sin(tick + 1.2)) * hw * 0.3 + hw,
      cy2 = (Mathf.sin(tick * 3) + Mathf.cos(tick + 0.1)) * hh * 0.3 + hh;
  var res = <f32>192 / Mathf.max(w, h);
  var y = 0;
  do {
    let x = 0;
    do {
      set(x, y, Mathf.abs(
        Mathf.sin(distance(x, y, cx1, cy1) * res) +
        Mathf.sin(distance(x, y, cx2, cy2) * res)
      ) * 120);
    } while (++x != width)
  } while (++y != height)
}

/** Recomputes and potentially grows memory on resize of the viewport. */
export function resize(w: i32, h: i32): void {
  width = w; height = h;
  // Pages are 64kb. Rounds up using mask 0xffff before shifting to pages.
  var needed = <i32>((offset + (w * h * sizeof<i32>() + 0xffff)) & ~0xffff) >>> 16;
  var actual = memory.size();
  if (needed > actual) memory.grow(needed - actual);
}

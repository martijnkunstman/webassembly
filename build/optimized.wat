(module
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $f64_f64_=>_f64 (func (param f64 f64) (result f64)))
 (memory $0 0)
 (export "add" (func $assembly/index/add))
 (export "multiply" (func $assembly/index/multiply))
 (export "hypot" (func $assembly/index/hypot))
 (export "memory" (memory $0))
 (func $assembly/index/add (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
 (func $assembly/index/multiply (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.mul
 )
 (func $assembly/index/hypot (param $0 f64) (param $1 f64) (result f64)
  local.get $0
  local.get $0
  f64.mul
  local.get $1
  local.get $1
  f64.mul
  f64.add
  f64.sqrt
 )
)

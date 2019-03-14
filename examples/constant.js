export const StoreModuleName = {
  home: 'home',
  modal: 'modal',
  table: 'table'
}

export const style = {
  siderWidth: '230px',
  siderWidthShrink: '80px'
}

export function getRules(rule) {
  const rules = rule.map(s => {
    return {
      [s[0]]: true,
      message: s[1]
    }
  })

  return { rules }
}

export function buildValidator(validator) {
  _.forIn(validator, (val, key) => {
    val.code = key
    val.rule = [key, { ...getRules(val.rule) }]
  })

  return validator
}

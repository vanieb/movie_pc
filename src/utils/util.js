export default class $ {

  static setIndicator(onActivate, onInactivate) {
    let hidden = 'hidden'

        // Standards:
    if (hidden in document) {
      document.addEventListener('visibilitychange', onchange)
    } else if ((hidden = 'mozHidden') in document) {
      document.addEventListener('mozvisibilitychange', onchange)
    } else if ((hidden = 'webkitHidden') in document) {
      document.addEventListener('webkitvisibilitychange', onchange)
    } else if ((hidden = 'msHidden') in document) {
      document.addEventListener('msvisibilitychange', onchange)
    } else if ('onfocusin' in document) {
            // IE 9 and lower:
      document.onfocusin = document.onfocusout = onchange
    } else {
            // All others:
      window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange
    }

    function onchange(evt) {
      let v = 'visible'
      let h = 'hidden'
      let status = ''
      let evtMap = {
        focus: v,
        focusin: v,
        pageshow: v,
        blur: h,
        focusout: h,
        pagehide: h
      }

      evt = evt || window.event
      if (evt.type in evtMap) {
        status = evtMap[evt.type]
      } else {
        status = this[hidden] ? 'hidden' : 'visible'
      }
      if (status === v && onActivate) {
        onActivate()
      } else if (status === h && onInactivate) {
        onInactivate()
      }
    }

        // set the initial state (but only if browser supports the Page Visibility API)
    if (document[hidden] !== undefined) {
      onchange({ type: document[hidden] ? 'blur' : 'focus' })
    }
  }

  static compareQuery(q1, q2) {
    let q1Keys = Object.keys(q1)
            .filter(element => !!q1[element])
            .sort()
    let q2Keys = Object.keys(q2)
            .filter(element => !!q2[element])
            .sort()
    return (
            `${q1Keys}` === `${q2Keys}` &&
            !q1Keys.find(key => `${q1[key]}` !== `${q2[key]}`)
    )
  }

  static getLanguage() {
    let navLang = navigator.language || navigator.userLanguage
    if (navLang === 'en' || navLang ==='en-US') {
      return navLang = 'en_US'
    } else {
      return navLang = 'zh_CN'
    }
  }

  static scrollToTop() {
    window.scrollTo(0, 0)
  }

  static isJsonString(str) {
    try {
      var o = JSON.parse(str)
      if (o && typeof o === 'object') {
        return o
      }
    } catch (e) {
      return false
    }
  }

}

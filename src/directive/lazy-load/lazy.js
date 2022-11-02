

const clientH = document.documentElement.clientHeight;

export default {
  bind (el, binding, vnode) {
    const callback = (entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const target = entry.target;

          if (binding.arg === 'back')

            el.style.backgroundImage = `url('${binding.value}')`;
          else target.src = binding.value;
          console.log(`el.style.backgroundImage`, el.style.backgroundImage);
 
          observer.unobserve(target);
        }
      })
    }
    const observer = new IntersectionObserver(callback);
    observer.observe(el)

  }, inserted (el, binding, vnode) {
  }, update (el, binding, vnode) {

    if (binding.arg === 'back')
      el.style.backgroundImage = `url(${binding.value})`;
    else
      el.src = binding.value;
  }, componentUpdated (el, binding, vnode) {


  }
}
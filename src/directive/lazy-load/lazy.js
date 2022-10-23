

const clientH = document.documentElement.clientHeight;

export default {
  bind (el, binding, vnode) {
    const callback = (entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = binding.value;
          observer.unobserve(img);
        }
      })
    }
    const observer = new IntersectionObserver(callback);
    observer.observe(el)

  }, inserted (el, binding, vnode) {
  }, update (el, binding, vnode) {

    el.src = binding.value;
  }, componentUpdated (el, binding, vnode) {


  }
}
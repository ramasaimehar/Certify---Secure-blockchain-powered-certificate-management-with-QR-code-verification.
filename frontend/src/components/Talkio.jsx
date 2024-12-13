import React, { useEffect } from 'react'

const Talkio = () => {
    useEffect(()=>{
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();
        (function () {
          var s1 = document.createElement("script");
          var s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = "https://embed.tawk.to/64a6481594cf5d49dc61d2e7/1h4koj5mq";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          s0.parentNode.insertBefore(s1, s0);
        })();
    },[])
    return null;
}

export default Talkio
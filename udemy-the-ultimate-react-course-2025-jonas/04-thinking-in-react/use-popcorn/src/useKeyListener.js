import { useEffect } from "react";

export function useKeyDownListener(keyCode, callback) {
  useEffect(() => {
    const keyListener = function(e) {
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        callback();
      }
    }

    console.log('useKeyDownListener', keyCode, callback);

    document.addEventListener('keydown', keyListener);

    return function() {
        console.log('removing listener', keyCode, callback);
        document.removeEventListener('keydown', keyListener);
    }
  }, [keyCode, callback]);
}
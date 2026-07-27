 const plane = document.getElementById('plane');
  const path = document.getElementById('flightpath');
  if(plane && path){
    const len = path.getTotalLength();
    function animatePlane(t){
      const progress = (t % 6000) / 6000;
      const point = path.getPointAtLength(progress * len);
      const point2 = path.getPointAtLength(Math.min(progress * len + 1, len));
      const angle = Math.atan2(point2.y - point.y, point2.x - point.x) * 180 / Math.PI;
      plane.setAttribute('transform', `translate(${point.x},${point.y}) rotate(${angle})`);
      requestAnimationFrame(animatePlane);
    }
    requestAnimationFrame(animatePlane);
  }
/*
 * @Author: Chendapeng
 * @Date: 2022-03-25 16:54:33
 * @LastEditors: Chendapeng
 * @LastEditTime: 2022-04-16 20:48:28
 * @Description: 
 */
// import './index.css'
import './style.scss'

const Progress = ({
  duration = 150,
  currentTime = 150,
  status,
  setStatus,
  setPlayStatus,
  radiusLen = 70, // 半径
  strokeLength = 10, // 弧形宽度
  defaultStroke='#e6e6e6', // 默认弧度背景色
  highStroke='#FF4646', // 当前高亮的颜色
}) => {
  const roundRadius = radiusLen;
  const roundPath = roundRadius * Math.PI * 2;
  // const currentProgress = Number(Math.floor(100 * currentTime / duration))
  return (
      <section id='progress-circle' 
        onClick={setPlayStatus}
        style={{
          width: `${(radiusLen + strokeLength) * 2}px`,
          height: `${(radiusLen + strokeLength) * 2}px`
        }}
      >
        <div className='progerss-cicle-percent'>
          <svg 
          className='progress-circle-svg'
          viewBox="0 0 32 32"
          version="1.1" 
          xmlns="http://www.w3.org/2000/svg" 
          >
            <circle className="progress-circle__circle" 
              cx={roundRadius}
              cy={roundRadius}
              r={roundRadius}
              style={{
                strokeDasharray: roundPath,
                strokeWidth: strokeLength,
                stroke: defaultStroke,
                transform: `translate(${strokeLength}px, ${strokeLength}px)`,
              }}
            ></circle>
            <circle className="progress-circle__circle" 
              cx={roundRadius}
              cy={roundRadius}
              r={roundRadius}
              style={{
                strokeDasharray: roundPath,
                strokeDashoffset: String(roundPath * (1 - (currentTime / duration))),
                strokeWidth: strokeLength,
                stroke: highStroke,
                transform: `translate(${strokeLength}px, ${strokeLength}px)`,
              }}
            ></circle>
            <path d="M23.25 15.567a.5.5 0 010 .866l-10.5 6.062a.5.5 0 01-.75-.433V9.938a.5.5 0 01.75-.433l10.5 6.062z" fill="#FF4646"></path>
          </svg>
        </div>
      </section>
  )
}
export default Progress
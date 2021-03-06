import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Result } from 'antd-mobile'
import { Button } from 'antd-mobile'
function NotFound(props: RouteComponentProps) {
  return (
    <div className="container">
      <div className="heart">
        <Result
          img={
            <svg id="cross-circle-o" viewBox="0 0 48 48">
              <path
                d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zm.353-25.77l-7.593-7.593c-.797-.8-1.538-.822-2.263-.207-.724.614-.56 1.617-.124 2.067l7.852 7.847-7.72 7.723c-.727.728-.56 1.646-.066 2.177.493.532 1.553.683 2.31-.174l7.588-7.584 7.644 7.623c.796.798 1.608.724 2.21.145.605-.58.72-1.442-.074-2.24l-7.657-7.67 7.545-7.52c.81-.697.9-1.76.297-2.34-.92-.885-1.85-.338-2.264.078l-7.685 7.667z"
                fillRule="evenodd"
                fill="rgb(241, 54, 66)"
              ></path>
            </svg>
          }
          title="404"
          message="您所访问的页面不存在!"
        ></Result>
        <Button
          type="warning"
          onClick={() => {
            props.history.push('/')
          }}
        >
          返回首页
        </Button>
      </div>
    </div>
  )
}

export default withRouter(NotFound)

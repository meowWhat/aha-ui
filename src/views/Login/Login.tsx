import './Login.less'
import logo from '../../img/logo.jpg'
import title from '../../img/title.jpg'
export const Login = () => {
  return (
    <div id="login">
      <div className="content">
        <header className="header">
          <img src={logo} alt="aha-logo" className="header-logo" />
          <img src={title} alt="aha-logo" className="header-title" />
        </header>
        <div className="form">
          <input type="text" />
          <input type="text" />
        </div>
      </div>
    </div>
  )
}

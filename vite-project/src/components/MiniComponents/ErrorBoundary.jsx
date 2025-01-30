import React from "react"
import ethereumWorld from '../../assets/Blockchain-Ethereum.jpeg'


class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true,error:error };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <div className='error-boundary'>
          <img className='error-boundary-image' src={ethereumWorld} alt="" />
          <p className='error-boundary-text'>An unexpected error occured, <u onClick={()=>window.location.reload()} style={{color:'purple'}}>Click here</u> to reload or try again later!.</p>
        </div>
      }else{

        return this.props.children; 
      }
  
    }
}
export default ErrorBoundary
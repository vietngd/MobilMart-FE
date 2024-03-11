import HeaderComponent from "../components/HeaderComponent/HeaderComponent"



const defaultLayout = ({children}) => {
  return (
    <div>
        <HeaderComponent/>
        {children}
    </div>
  )
}

export default defaultLayout
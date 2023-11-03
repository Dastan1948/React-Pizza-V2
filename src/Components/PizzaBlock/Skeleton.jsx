import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
  className='pizza-block' 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="129" cy="159" r="119" /> 
    <rect x="-1" y="296" rx="10" ry="10" width="280" height="25" /> 
    <rect x="108" y="324" rx="0" ry="0" width="0" height="1" /> 
    <rect x="3" y="351" rx="10" ry="10" width="280" height="88" /> 
    <rect x="6" y="457" rx="10" ry="10" width="95" height="30" /> 
    <rect x="129" y="449" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton
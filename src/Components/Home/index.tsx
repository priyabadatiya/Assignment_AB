import { Link } from "react-router-dom";

export default function AGDemo() {
    return (
        <div>
          <Link to='/grapejs'>Hey Click me to see Grape Js</Link>
          <br/>
          <Link to='/agdemo'>Hey Click me to see AG Table</Link>
        </div>
    );
}

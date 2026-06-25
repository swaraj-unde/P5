import { Outlet } from "react-router-dom";
import ShopHeader from "./header";
function ShopLayout() {
  return (
    <div>
      <div>
        <ShopHeader />
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}
export default ShopLayout;

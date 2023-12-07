import { Outlet, redirect, useLoaderData } from "react-router-dom";

function MainLayout() {
  const token = useLoaderData();
  console.log("token", token);

  // if (!token) {
  //   return redirect("/login");
  // }

  return (
    <>
      {/* nav bar components */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;

// import { createBrowserRouter } from "react-router-dom";

// const routers = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//     children: [],
//   },
//   {
//     path: "/auth",
//     children: [
//       {
//         path: "sign-in",
//         element: <SignIn />,
//       },
//       {
//         path: "sign-up",
//         element: <SignUp />,
//       },
//       {
//         path: "verify",
//         element: <Verification />,
//       },
//       {
//         path: "reset-password",
//         element: <ResetPassword />,
//       },
//     ],
//   },
//   {
//     path: "/admin",
//     element: <AdminLayout />,
//     children: [
//       {
//         path: "users",

//         children: [
//           {
//             path: "",
//             element: <ManagementUser />,
//           },
//           {
//             path: "detail/:id",
//             element: <DetailUser />,
//           },
//         ],
//       },
//       {
//         path: "partners",
//         children: [
//           {
//             path: "",
//             element: <ManagementPartner />,
//           },
//           {
//             path: ":id",
//             element: <DetailUser partner={"partner"} />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// export default routers;

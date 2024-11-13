import { Route, Navigate, Routes } from 'react-router-dom';
import { RouteInterface } from '../interface/interface';

/**
 * Renders provided routes using React Router's Switch & Route components.
 * @param {Routes} routes A list of routes to be used within an app. See
 * the README for this module for more guidance on what to provide.
 * https://v5.reactrouter.com/web/guides/quick-start
 */

interface AllRoutesProps {
  routes: RouteInterface[];
}
const AllRoutes = ({ routes }: AllRoutesProps) => {
  // const defaultRoute = routes.find((element) => {
  //   return element.isDefault;
  // });

  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        );
      })}

      {/* catch-all to redirect any unknown paths to default page for the app */}

      <Route index path="*" element={<Navigate replace to={`/404`} />} />
    </Routes>
  );
};

export default AllRoutes;

import React from 'react';
import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import Easy from './Component/Easy/Easy';
import Hard from './Component/Hard/Hard';
import Layout from './Component/Layout/Layout';

const routes =createBrowserRouter([
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
            {
                index:true,
                element:<Hard></Hard>
            },{
                path:'/easy',
                element:<Easy></Easy>
            }
        ]
    }
  ]);

export default routes;
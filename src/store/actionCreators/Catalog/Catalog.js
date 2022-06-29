import axios from "axios";
import { toast } from "react-toastify";

export const getAllCategories = () => {
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/product/get_category`)
      .then((categories) => {
        dispatch({
          type: "GET_ALL_CATEGORIES",
          categories,
        });
      });
  };
};
export const getAllProducts = () => {
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/product/get_products`)
      .then((products) => {
        dispatch({
          type: "GET_ALL_PRODUCTS",
          products,
        });
      });
  };
};
export const getAddons = () => {
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/product/get_addons`)
      .then((addons) => {
        dispatch({
          type: "GET_ALL_ADDONS",
          addons,
        });
      });
  };
};
export const addNewCategory = (object) => {
  const form = new FormData();

  for (let key in object) {
    console.log(key, object[key]);
    form.append(key, object[key]);
  }
  console.log(object);
  console.log(form.getAll);

  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/v1/admin/product/add_category`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((res) => {
      toast.success(`NEW CATEGORY ADDED SUCCESFULLY`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const myTimeout = setTimeout(window.location.reload(false), 3000);
      clearTimeout(myTimeout);
    })
    .catch((err) => {
      console.log("error", err);
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
};
export const addNewFoodItem = (object) => {
  const form = new FormData();

  for (let key in object) {
    form.append(key, object[key]);
  }

  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/v1/admin/product/add_fooditem`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((res) => {
      toast.success(`New Product added successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const myTimeout = setTimeout(window.location.reload(false), 3000);
      clearTimeout(myTimeout);
    })
    .catch((err) => {
      console.log("error", err);
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
};
export const addNewAddon = (title, options) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}api/v1/admin/product/add_addons`, {
      title: title,
      add_on_options: options,
    })
    .then((res) => {
      toast.success(`New Addon added successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
     setTimeout(window.location.reload(false), 3000);
    })
    .catch((err) => {
      console.log("error", err);
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
};
export const get_category_branches = (cat_list_id, branch_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/product/get_category_by_branches?category_list_id=${cat_list_id}&branch_id=${branch_id}`
      )
      .then((data) => {
        
        dispatch({
          type: "GET_BRANCH_PRODUCT",
          data: data.data,
        });
      });
  };
};

export const get_product_branch = (cat_list_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/product/get_category_branches?category_list_id=${cat_list_id}`
      )
      .then((data) => {
        dispatch({
          type: "GET_CATEGORY_BRANCHES",
          data: data.data,
        }); 
      });
  };
};


export const getSingleCategory = (category)=>{
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/product/get_category`)
      .then((categories) => {
        dispatch({
          type: "GET_ALL_CATEGORIES",
          categories,
        });
      });
  };
}

export const updateCategory = (category) => {
  const form = new FormData();
  for (let key in category) {
    form.append(key, category[key]);
  }

  return (dispatch, getState) => {
    
 
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/product/edit_category_list`,form ,{
          headers: { "Content-Type": "multipart/form-data" },
        }     )
      .then((res) => {
        
        if (res.data.status === "success") {
          
          toast.success(`Category Updated succesfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
         setTimeout(window.location.reload(false), 2000);
       
          dispatch({
            type: "UPDATE_CATEGORY",
            payload:category
          })
         
          
        } else {
          toast.error(`Failure`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const addProductToCategory = (productdata) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/product/add_product_branch`,
        productdata
      ).then((res) => {
        if (res.data.msg === "success") {
          toast.success(`Product Added successfully`, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

        dispatch({
          type: "ADD_PRODUCT",
          payload:res.data.data
        })
          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
        }  
        else {
          toast.error(`Failure`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };
};

 export const currentCat = (data)=>{
  return (dispatch, getState) => {

   dispatch
    ({
      type: "CURRENT_CAT",
      payload:data
    })
   
  }
 }

 
 export const currentBranch = (data)=>{
  return (dispatch, getState) => {

   dispatch
    ({
      type:"get_current_branch",
      payload:data
    })
   
  }
 }
 export const deleteProductCat = (data) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/product/del_product_branch?product_id=${data}`
      ).then((res) => {
        if (res.data.status === "success") {
          toast.success(`Product Deleted successfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

        dispatch({
          type: "DELETE_PRODUCT",
        })
          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
        }  
        else {
          toast.error(`Failure`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };
};
 
export const updateProduct = (product) => {
  const form = new FormData();
  for (let key in product) {
    form.append(key, product[key]);
  }

  return (dispatch, getState) => {
    
 
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/product/edit_product_list`,form ,{
          headers: { "Content-Type": "multipart/form-data" },
        }     )
      .then((res) => {
        
        if (res.data.status === "success") {
          
          toast.success(`Category Updated succesfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
         setTimeout(window.location.reload(false), 3000);
       
          dispatch({
            type: "UPDATE_PRODUCT",
            payload:product
          })
         
        } else {
          toast.error(`Failure`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const GetProductCat = (data) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/product/del_product_branch?product_id=${data}`
      ).then((res) => {
        if (res.data.status === "success") {
          toast.success(`Product Deleted successfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

        dispatch({
          type: "DELETE_PRODUCT",
        })
          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
        }  
        else {
          toast.error(`Failure`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };
};

 
 


import React, { useEffect, useState } from "react";
import ReactMultiselectCheckboxes from "react-multiselect-checkboxes/lib/ReactMultiselectCheckboxes";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBranches } from "../../../store/actionCreators/Branch/BranchAction";
import AddCategoryToBranches from "./AddCategoryToBranches";
import AddNewCategory from "./AddNewCategory";
import "../../../css/catalog/common.css";
import { addNewCategory } from "../../../store/actionCreators/Catalog/Catalog";
import Unauthorized from "../../unauthorized";
const AddNewCatMain = (props) => {
  // step1 vars
  const branch = useSelector((state) => state.branch);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const [selectedBranches, setSelected] = useState([]);
  const [uploadedImage, setUploadedIM] = useState(null);
  const [preview, setPreview] = useState();
  const [step, setStep] = useState(1);
  const [catName, setCatname] = useState({
    name: "",
    description: "",
    items_available: 0,
  });
 

  useEffect(() => {
    dispatch(getBranches());
  }, []);
  // getting branches in a particular format
  useEffect(() => {
    let array = [];
    if (branch.data) {
      branch.data.data.map((item, index) => {
        array.push({ label: item.branch_name, value: item.branch_id });
      });
    }
    setOptions(array);
  }, [branch]);
  // HELPER FUNCTIONS branches  FOR CHECKBOXDROPDOWN
  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    // if (value && value.some((o) => o.value === "*")) {
    //   return `${placeholderButtonLabel}: All`;
    // } 
    // else {}
      return `${placeholderButtonLabel}: ${value.length} selected`;
    
  }
  function onChange(value, event) {
    // if (event.action === "select-option" && event.option.value === "*") {
    //   this.setState(this.options);
    // } else if (
    //   event.action === "deselect-option" &&
    //   event.option.value === "*"
    // ) {
    //   this.setState([])};
     if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }

  const displayBranch = () => {
    if (options) {
      return (
        <div className="categorySelect">
          <ReactMultiselectCheckboxes
            options={[...options]}
            placeholderButtonLabel="Branches"
            getDropdownButtonLabel={getDropdownButtonLabel}
            value={selectedBranches}
            onChange={onChange}
            setState={setSelected}
            required
          />
        </div>
      );
    }
  };
  // HELPER FUNCTIONS FOR branches CHECKBOXDROPDOWN ENDS
  // Fucntionality for upload and preview of image
  useEffect(() => {
    if (!uploadedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(uploadedImage);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedImage]);
  const imageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedIM(file);
    } else {
      setUploadedIM(null);
    }
  };
  // Fucntionality for upload and preview of image ENDS
  // OnClick for first form
  const onClickCat = (e) => {
    if (selectedBranches.length > 0) {
      setStep(step + 1);
      e.preventDefault();

      // dispatch(addNewCategory(catName.name,catName.description,preview,SelectedB))
    } else {
      toast.error(`please add branches`, {
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
  };
  const handleChange = (input) => (e) => {
    setCatname({ ...catName, [input]: e.target.value });
  };
  // OnClick for first form Ends
  // STEP 1 ENDS
  // STEP 2 VARS
  const products = useSelector((state) => state.products);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [optionsP, setOptionsp] = useState([]);

  useEffect(() => {
    let array = [];
    if (products.data) {
      products.data.data.map((item, index) => {
        array.push({ label: item.product_name, value: item.product_list_id });
      });
    }
    setOptionsp(array);
  }, [products]);

  function getDropdownButtonLabel1({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }
  function onChange1(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }

  const displayCategory = () => {
    if (optionsP) {
      return (
        <div
          id="catDropdown"
          className="categorySelect"
          style={{ paddingBottom: "400px" }}
        >
          <ReactMultiselectCheckboxes
          // { label: "All", value: "*" },
            options={[...optionsP]}
            placeholderButtonLabel="Products"
            getDropdownButtonLabel={getDropdownButtonLabel1}
            value={selectedProducts}
            onChange={onChange1}
            setState={setSelectedProducts}
            menuIsOpen={true}
            styles={{ dropdownButton: (base) => ({ ...base, zIndex: 0 }) }}
            required
          />
        </div>
      );
    }
  };

  //    STEP2 ENDS
  const onSubmit = (e,productArr) => {
    let data=[...productArr]
    e.preventDefault();
    if (selectedProducts.length > 0) {
      let productString = "";
      for (let i = 0; i < selectedProducts.length; i++) {
        if (selectedProducts[i].label === "All") {
          productString = "All";
          break;
        } else {
          if (i === selectedProducts.length - 1) {
            productString = productString + selectedProducts[i].value;
          } else {
            productString = productString + selectedProducts[i].value + ",";
          }
        }
      }
      let branchString = "";
      for (let i = 0; i < selectedBranches.length; i++) {
        if (selectedBranches[i].label === "All") {
          branchString = "All";
          break;
        } else {
          if (i === selectedBranches.length - 1) {
            branchString = branchString + selectedBranches[i].value;
          } else {
            branchString = branchString + selectedBranches[i].value + ",";
          }
        }
      }
      let price=[];
      if(data.length>0){
      data.map(item=>{
              price.push(item.price);
      })
      }
      let item=[];
      if(data.length>0){
      data.map(val=>{
              item.push(val.item);
      })
      }

      const object = {
        category_name: catName.name,
        description: catName.description,
        branch_id: branchString,
        image: uploadedImage,
        product_id: productString,
        items_available: item.toString(),
        prices:price.toString(),
      };
     
     
      addNewCategory(object);
    }
  };
  // logic for multipart form
  const main = () => {
    if (props.editPermission) {
      if (step === 1) {
        return (
          <>
            <AddNewCategory
              sideToggle={props.sideToggle}
              catName={catName}
              handleChange={handleChange}
              imageUpload={imageUpload}
              uploadedImage={uploadedImage}
              preview={preview}
              displayBranch={displayBranch}
              onClickCat={onClickCat}
            />
          </>
        );
      } else {
        return (
          <>
            <AddCategoryToBranches
              sideToggle={props.sideToggle}
              displayCategory={displayCategory}
              setStep={setStep}
              onSubmit={onSubmit}
              selectedProducts={selectedProducts}
            />
          </>
        );
      }
    }
    return <Unauthorized />;
  };
  return <div>{main()}</div>;
};

export default AddNewCatMain;

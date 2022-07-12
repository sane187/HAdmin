import React, { useEffect, useState } from "react";
import ReactMultiselectCheckboxes from "react-multiselect-checkboxes/lib/ReactMultiselectCheckboxes";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBranches } from "../../../store/actionCreators/Branch/BranchAction";
import { addNewFoodItem } from "../../../store/actionCreators/Catalog/Catalog";
import Unauthorized from "../../unauthorized";
import AddAddons from "./AddAddons";
import AddNewProduct from "./AddNewProduct";
import AddProductToCategories from "./AddProductToCategories";

const AddNewFoodMain = (props) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch);
  const [selectedBranches, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [uploadedImage, setUploadedIM] = useState(null);
  const [preview, setPreview] = useState();
  const [Newproduct, setNewProduct] = useState({
    product_name: "",
    sku: 0,
    items_available: 0,
    description: "",
    product_type: "Kitchen",
    price: 0.0,
    image: uploadedImage,
    status: "Active",
    food_type: "Veg",
    prepare_time: "",
  });
  useEffect(() => {
    dispatch(getBranches());
  }, []);
  useEffect(() => {
    let array = [];
    if (branch.data) {
      branch.data.data.map((item, index) => {
        array.push({ label: item.branch_name, value: item.branch_id });
      });
    } else array = [];
    setOptions(array);
  }, [branch]);
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
      setNewProduct({ ...Newproduct, image: file });
    } else {
      setUploadedIM(null);
    }
  };
  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }
  function onChange(value, event) {
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

  const displayBranch = () => {
    if (options) {
      return (
        <div className="categorySelect">
          <ReactMultiselectCheckboxes
            options={[{ label: "All", value: "*" }, ...options]}
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
  const handleChange = (entry) => (e) => {
    setNewProduct({ ...Newproduct, [entry]: e.target.value });
  };

  //   STEP 2 FORM STARTS
  const products = useSelector((state) => state.categories);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [optionsP, setOptionsp] = useState([]);

  useEffect(() => {
    let array = [];
    if (products.data) {
      products.data.data.map((item, index) => {
        array.push({ label: item.category_name, value: item.category_list_id });
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
            options={[{ label: "All", value: "*" }, ...optionsP]}
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
  // Add adons functions start
  const [addon, setAddon] = useState({
    title: "",
    sku: "",
    order: null,
    price: null,
  });

  const handleChangeAddon = (value) => (event) => {
    setAddon({ ...addon, [value]: event.target.value });
  };
  const addons = useSelector((state) => state.addons);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [optionsAddons, setOptionsAddons] = useState([]);

  useEffect(() => {
    let array = [];
    if (addons.data) {
      addons.data.data.map((item, index) => {
        array.push({ label: item.title, value: item.add_ons_id });
      });
    }
    setOptionsAddons(array);
  }, [addons]);

  function getDropdownButtonLabel2({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }
  function onChange2(value, event) {
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

  const displayAddons = () => {
    if (optionsAddons) {
      return (
        <div
          id="catDropdown"
          className="categorySelect"
          style={{ paddingBottom: "400px" }}
        >
          <ReactMultiselectCheckboxes
            options={[{ label: "All", value: "*" }, ...optionsAddons]}
            placeholderButtonLabel="Products"
            getDropdownButtonLabel={getDropdownButtonLabel2}
            value={selectedAddons}
            onChange={onChange2}
            setState={setSelectedAddons}
            menuIsOpen={true}
            styles={{ dropdownButton: (base) => ({ ...base, zIndex: 0 }) }}
            required
          />
        </div>
      );
    }
  };
  //   First next
  const nextStep = (e) => {
    if (selectedBranches.length > 0) {
      let SelectedB = [];
      selectedBranches.map((item, index) => {
        SelectedB.push(item.value);
      });
      setStep(step + 1);

      console.log(Newproduct, SelectedB, addon);
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
    e.preventDefault();
  };
  //   sECOND FORM bACK
  const handleBackSecondForm = (e) => {
    setStep(1);
    e.preventDefault();
  };
  //   sECOND FORM next
  const handleNextSecondForm = (e) => {
    if (selectedAddons.length > 0) {
      setStep(3);
    } else {
      toast.error(`please add addons`, {
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

    e.preventDefault();
  };
  const handleFinalSubmit = (e) => {
    if (selectedBranches.length > 0) {
      let branchString = "";
      let addonString = "";
      let productString = "";
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
      for (let i = 0; i < selectedAddons.length; i++) {
        if (selectedAddons[i].label === "All") {
          addonString = "All";
          break;
        } else {
          if (i === selectedAddons.length - 1) {
            addonString = addonString + selectedAddons[i].value;
          } else {
            addonString = addonString + selectedAddons[i].value + ",";
          }
        }
      }
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
      const object = {
        product_name: Newproduct.product_name,
        description: Newproduct.description,
        image: Newproduct.image,
        branch_id: branchString,
        items_available: Newproduct.items_available,
        add_ons_id: addonString,
        sku: Newproduct.sku,
        prepare_time: Newproduct.prepare_time,
        product_type: Newproduct.product_type,
        food_type: Newproduct.food_type,
        price: Newproduct.price,
        category_id: productString,
      };
      addNewFoodItem(object);
      console.log("New Product", Newproduct);
      console.log("Selected categories", selectedBranches);
      console.log("Selected addons", selectedAddons);
      console.log("Selected products", selectedProducts);
    } else {
      toast.error(`please add products`, {
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
    e.preventDefault();
  };

  // Add adons functions end
  const main = () => {
    if (props.editPermission) {
      if (step === 1) {
        return (
          <>
            <AddNewProduct
              sideToggle={props.sideToggle}
              displayBranch={displayBranch}
              setStep={setStep}
              imageUpload={imageUpload}
              uploadedImage={uploadedImage}
              preview={preview}
              Newproduct={Newproduct}
              handleChange={handleChange}
              nextStep={nextStep}
            />
          </>
        );
      } else if (step === 2) {
        return (
          <>
            <AddAddons
              sideToggle={props.sideToggle}
              setStep={setStep}
              displayCategory={displayAddons}
              addon={addon}
              handleChangeAddon={handleChangeAddon}
              handleBackSecondForm={handleBackSecondForm}
              handleNextSecondForm={handleNextSecondForm}
            />
          </>
        );
      } else {
        return (
          <>
            <AddProductToCategories
              sideToggle={props.sideToggle}
              setStep={setStep}
              displayCategory={displayCategory}
              handleFinalSubmit={handleFinalSubmit}
            />
          </>
        );
      }
    }
    return <Unauthorized />;
  };
  return <div>{main()}</div>;
};

export default AddNewFoodMain;

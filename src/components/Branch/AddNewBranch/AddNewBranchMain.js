import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMultiselectCheckboxes from "react-multiselect-checkboxes/lib/ReactMultiselectCheckboxes";
import AddNewBranch from "./AddNewBranch";
import AddCatToBranch from "./AddCatToBranch";
import { addNewBranch } from "../../../store/actionCreators/Branch/BranchAction";
import { toast } from "react-toastify";
import Unauthorized from "../../unauthorized";
import { DropdownButton, Dropdown } from "react-bootstrap";

const AddNewBranchMain = (props) => {
  const dispatch = useDispatch();
  const franchise = useSelector((state) => state.franchise);
  const [selectedFranchise, setSelectedFranchise] = useState({});
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState([]);
  // ADD NEW BRANCH FIRST PAGE
  const [newBranch, setNewBranch] = useState({
    BranchName: "",
    city: "",
    region: "",
    address: "",
  });

  const handleSubmit = (categories) => {
    const cat_branch = [];
    for (let cat in categories) {
      const catObj = { category_list_id: cat };
      const prodObj = categories[cat];
      
      const product_list_id = [];
      for (let prod in prodObj) {
        const product = { id: prod, items_available: prodObj[prod][0],price:prodObj[prod][1]};
        product_list_id.push(product);
      }
      catObj["product_list_id"] = product_list_id;
      if(catObj.product_list_id.length<1){
        console.log("empty")
      }
      else{
      cat_branch.push(catObj);}
    }
    const branch = {
      ...newBranch,
      branch_name: newBranch.BranchName,
      cat_branch,
      franchise_id: selectedFranchise.franchise_id,
    };
     console.log(branch)

    dispatch(addNewBranch(branch));
  };

  useEffect(() => {
    let array = [];
    if (franchise.data) {
      franchise.data.data.forEach((item, index) => {
        array.push({ label: item.franchise_name, value: item.franchise_id });
      });
    }
    setOptions(array);
  }, [franchise]);

  const displayFranchise = () => {
    if (options) {
      return (
        <div className="categorySelect">
          <DropdownButton
            variant="light"
            title={
              selectedFranchise.franchise_name
                ? selectedFranchise.franchise_name
                : "Franchise"
            }
            id="dropdown-menu-align-right"
            onSelect={(e) => {
              const franchise = JSON.parse(e);
              setSelectedFranchise({
                franchise_name: franchise[0],
                franchise_id: franchise[1],
              });
            }}
          >
            {displayFranchiseOptions()}
          </DropdownButton>
        </div>
      );
    }
  };

  const displayFranchiseOptions = () => {
    return franchise.data.data.map((item, index) => {
      return (
        <Dropdown.Item
          key={item.franchise_id}
          eventKey={`["${item.franchise_name}","${item.franchise_id}"]`}
        >
          {" "}
          {item.franchise_name}
        </Dropdown.Item>
      );
    });
  };
  const handleNewBranchChange = (value) => (e) => {
    setNewBranch({ ...newBranch, [value]: e.target.value });
  };
  const onClickCat = (e) => {
    e.preventDefault();
    if (selectedFranchise.franchise_id) {
      setStep(step + 1);

      // dispatch(addNewCategory(catName.name,catName.description,preview,SelectedB))
    } else {
      toast.error(`please add Franchise`, {
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
  const main = () => {
    if (props.editPermission) {
      if (step === 1) {
        return (
          <AddNewBranch
            sideToggle={props.sideToggle}
            newBranch={newBranch}
            setNewBranch={setNewBranch}
            displayFranchise={displayFranchise}
            onChange={handleNewBranchChange}
            onClickCat={onClickCat}
          />
        );
      } else
        return (
          <AddCatToBranch
            sideToggle={props.sideToggle}
            setStep={setStep}
            handleSubmit={handleSubmit}
          />
        );
    }
    return <Unauthorized />;
  };
  return <div>{main()}</div>;
};

export default AddNewBranchMain;

import { useState } from "react";
import { Modal, Button, Typography, Input, Select } from "antd";
import { PlusCircleFilled, } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { createCategory,  DeleteSubCategory, UpdateSubCategory } from "../../redux";


const SubCategoryModal = ({ type, PreviousData , PreviousCategory}) => {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState(null);
  const [Category, setCategory] = useState();
  const [Loading, setLoading] = useState(false);
  const [LoadingDelete, setLoadingDelete] = useState(false);
  const AllCategory = useSelector((state) => state.CategoryReducer.AllCategory);
  const dispatch = useDispatch();
  

  const showModal = () => {
    setIsModalVisible(true);
    setName(PreviousData?.name);
    setCategory(PreviousData?.mainCat);
    console.log("PreviousData", PreviousData);
  };

  const handleOk = async () => {
    setLoading(true);
    let payload = {
      name: name,
      parentCategory: Category,
      categoryType: "sub",
    };
    let payload2 = {
      name: name,
      parentCategory:  PreviousCategory?._id,
      id: PreviousData?._id,
    };

    if (name) {
      PreviousData
        ? await dispatch(UpdateSubCategory(payload2, "sub"))
        : await dispatch(createCategory(payload,"sub"));
        
      setLoading(false);
      setIsModalVisible(false);
      setName("");
      setCategory(null);
    } else {
      swal("", "Fill All Fields Correctly", "error");
      setLoading(false);
      setCategory(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function onChange(value) {
    console.log(`selected ${value}`);
    setCategory(value);
  }
  return (
    <div className="category-modal">
      {type ? (
        <span onClick={showModal}>{PreviousData?.name}</span>
      ) : (
        <Button type="primary" onClick={showModal} icon={<PlusCircleFilled />}>
          Add Sub Category
        </Button>
      )}
      <Modal
        title={
          <Typography.Title level={3} className="black">
            {PreviousData ? "Update Sub Category" : "Add Sub Category"}
          </Typography.Title>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <br />
        <p className="black">Category Name</p>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={onChange}
          defaultValue={PreviousCategory?._id}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {PreviousCategory ? (<Option value={PreviousCategory._id}>{PreviousCategory.name}</Option>) : AllCategory?.map((data) => (
            <Option value={data._id}>{data.name}</Option>
          ))}
          
        </Select>
        <br />
        <br />
        <p className="black">Sub Category Name</p>
        <Input value={name} onChange={(e) => setName(e.target.value)} />  
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleOk}
          className="Save-Btn"
          loading={Loading}
        >
          {PreviousData ? "Update" : "ADD"}
        </Button>

        {PreviousData? (<Button
          type="primary"
          htmlType="submit"
          className="Save-Btn"
          loading={LoadingDelete}
          danger
          style={{marginLeft:"8px"}}
          onClick={() => dispatch(DeleteSubCategory({ id: PreviousData._id })).then(setIsModalVisible(false))}
        >
          Delete
        </Button>) : ''}
      </Modal>
    </div>
  );
};

export default SubCategoryModal;

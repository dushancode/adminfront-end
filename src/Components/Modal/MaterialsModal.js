import { useState, useEffect } from "react";
import { Modal, Button, Typography, Input, Select } from "antd";
import { PlusCircleFilled, PlusOutlined, EditFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import swal from "sweetalert";

import { createCategory, UpdateCategory, GetCategoriesByID } from "../../redux";
import { privateAPI } from "../../API";

const MaterialsModal = ({ type, PreviousData }) => {
    const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Category, setCategory] = useState(null);
  const AllCategory = useSelector((state) => state.CategoryReducer.AllCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategoriesByID());
  }, []);


  const showModal = () => {
    setIsModalVisible(true);
    setName(PreviousData?.name);
    setCategory(PreviousData?.mainCat);
    console.log("PreviousData", PreviousData);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      if (name) {
        
        const res = await privateAPI.post('material/create', { name });
        setLoading(false);
        setIsModalVisible(false);
        setName('');
        setCategory(null);
        console.log(res.data); 
      } else {
        swal('', 'Fill All Fields Correctly', 'error');
        setLoading(false);
        setCategory(null);
      }
    } catch (error) {
      swal('', error.toString(), 'error'); 
      setLoading(false);
      setCategory(null);
    }
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };


    
  return (
    <div className="category-modal">
      {type ? (
        <span onClick={showModal}>{PreviousData?.name}</span>
      ) : (
        <Button type="primary" onClick={showModal} icon={<PlusCircleFilled />}>
          Add Materials
        </Button>
      )}
      <Modal
        title={
          <Typography.Title level={3} className="black">
            {PreviousData ? "Update Sub Category" : "Add Materials"}
          </Typography.Title>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        
        <br />
        <p className="black">Material Name</p>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        {/* <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Select Category"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">E-Books</Option>
          <Option value="e">E-Magazines</Option>
          <Option value="lucy">Audio Books</Option>
        </Select> */}
        
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleOk}
          className="Save-Btn"
          loading={Loading}
        >
          {PreviousData ? "Update" : "ADD"}
        </Button>
      </Modal>
    </div>
  )
}

export default MaterialsModal

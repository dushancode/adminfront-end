import { useEffect, useState } from "react";
import { Typography, Tree, Radio, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFilled } from "@ant-design/icons";
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import {
  EyeFilled
} from '@ant-design/icons';

import LayoutMain from "./../../Layout/LayoutMain";
import DataTable from "../../Components/Table/DataTable";
import CategoryModal from "../../Components/Modal/CategoryModal";
import SubCategoryModal from "./../../Components/Modal/SubCategoryModal";
import { GetAllCategory, GetMaterial, DeleteCategory, GetSubCategoriesByID, DeleteSubCategory } from "../../redux";
import { privateAPI } from "../../API";


const ViewCategory = () => {
    const [data, setData] = useState(null);
  const AllCategory = useSelector((state) => state.CategoryReducer.AllCategory);
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([])

useEffect(()=>{

},[])

  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetAllCategory({ type: "" }));
      dispatch(GetMaterial());
      dispatch(GetSubCategoriesByID(id));
  
      try {
        const res = await privateAPI.get(`category/main/${id}`);
        if (res && res.data) {
          
          setCategory(res.data);
          const response = await privateAPI.get(`category/subcategory/${id}`);
          setSubCategory(response.data);
          
        }
        
      } catch (error) {
        // Handle error here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, id, type]);


  const onSelect = (selectedKeys, info) => {
    console.log("info", info);
    console.log("selectedKeys", selectedKeys);
  };
  
  useEffect(() => {
    let tempArr = [];
    subCategory?.map((data, index) => {
      tempArr.push({
        key: data._id,
        srno: index + 1,
        // main:
        //   data.categoryType === "sub"
        //     ? data.mainCat.material.name
        //     : data.material.name,
        main:
            data.categoryType === "sub"
              ? data.mainCat?.material?.name || "N/A"
              : data.material?.name || "N/A",
        category: (
          <Tree
            onSelect={onSelect}
            // onCheck={onCheck}
            treeData={[
              {
                title: (
                  <CategoryModal
                    type={true}
                    PreviousData={data}
                    catType={type}
                  />
                ),
                key: data?._id,

                children: data?.sub_categories?.map((sub) => ({
                  title: <SubCategoryModal type={true} PreviousData={sub} />,
                  key: sub._id,
                })),
              },
            ]}
          />
        ),
        action: (
          <div className="" style={{ display: "flex", gap: "10px" }}>
            <Button
              shape={"circle"}
              icon={<DeleteFilled className="color-red" />}
              onClick={() => {dispatch(DeleteSubCategory({ id: data._id }, type))
            }}
            />
          </div>
        ),
      });
    });
    setData(tempArr && tempArr);
  }, [subCategory]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
   
    {
      title: "SubCategory",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  
  return (
    <LayoutMain active={"categories"}>
    <div className="white-card">
      <Typography.Title level={2}>{category.name}</Typography.Title>
      
      <div>
        <DataTable
          columns={columns}
          data={data}
          width={600}
          pagination={true}
          Search={true}
          SearchRoute={"Category"}
          loader={AllCategory === null ? true : false}
        />
      </div>
    </div>
  </LayoutMain>
  )
}

export default ViewCategory

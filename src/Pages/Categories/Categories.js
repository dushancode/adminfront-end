import { useEffect, useState } from "react";
import { Typography, Tree, Radio, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFilled } from "@ant-design/icons";

import LayoutMain from "./../../Layout/LayoutMain";
import DataTable from "../../Components/Table/DataTable";
import CategoryModal from "../../Components/Modal/CategoryModal";
import SubCategoryModal from "./../../Components/Modal/SubCategoryModal";
import {
  GetAllCategory,
  GetMaterial,
  DeleteCategory,
  GetAllSubCategories,
} from "../../redux";

const Categories = () => {
  const [data, setData] = useState(null);
  const AllCategory = useSelector((state) => state.CategoryReducer.AllCategory);
  const AllSubCategory = useSelector(
    (state) => state.CategoryReducer.ALLSubCategories
  );
  const MaterialOption = useSelector((state) => state.CategoryReducer.Material);
  const dispatch = useDispatch();
  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(GetAllCategory());
    dispatch(GetMaterial());
    dispatch(GetAllSubCategories());
  }, [dispatch]);

  const onSelect = (selectedKeys, info) => {
    console.log("info", info);
    console.log("selectedKeys", selectedKeys);
  };

  useEffect(() => {
    let tempArr = [];
    AllCategory?.map((data, index) => {
      tempArr.push({
        key: data._id,
        srno: index + 1,

        main:
          data.categoryType === "sub"
            ? data.mainCat?.material?.name || "N/A"
            : data.material?.name || "N/A",

        category: (
          <Tree
            onSelect={onSelect}
            treeData={[
              {
                title: (
                  <CategoryModal
                    type={true}
                    PreviousData={data}
                    catType={type}
                  />
                ),
              },
            ]}
          />
        ),

        subcategory: (
          <div key={index}>
            {AllSubCategory?.filter(
              (data2) => data2.parentCategory === data?._id
            ).map((data2) =>
              data2?.name ? (
                <Tree
                  onSelect={onSelect}
                  treeData={[
                    {
                      title: (
                        <SubCategoryModal
                          type={true}
                          PreviousData={data2}
                          PreviousCategory={data}
                        />
                      ),
                      key: data?._id,
                    },
                  ]}
                />
              ) : null
            )}
          </div>
        ),

        action: (
          <div className="">
            <Button
              shape={"circle"}
              icon={<DeleteFilled className="color-red" />}
              onClick={() => dispatch(DeleteCategory({ id: data._id }, type))}
            />
          </div>
        ),
      });
    });
    setData(tempArr && tempArr);
  }, [AllCategory, AllSubCategory, type, dispatch]);

  const columns = [
    {
      title: "Sr No",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Materials",
      dataIndex: "main",
      key: "main",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Sub Category",
      dataIndex: "subcategory",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const handleTabChange = (e) => {
    setType(e.target.value);
    if (e.target.value === "all") {
      dispatch(GetAllCategory({ type: "" }));
      setType("");
    } else {
      dispatch(GetAllCategory({ type: e.target.value }));
    }
  };

  return (
    <LayoutMain active={"categories"}>
      <div className="white-card">
        <Typography.Title level={2}>Categories</Typography.Title>
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Radio.Group
            defaultValue="E-Book"
            buttonStyle="solid"
            onChange={handleTabChange}
            value={type}
          >
            {MaterialOption?.map((mat) => (
              <Radio.Button value={mat._id}>{mat.name}</Radio.Button>
            ))}
            <Radio.Button value="all">All</Radio.Button>
          </Radio.Group>
        </div>
        <div className="ml-left-flex">
          <CategoryModal catType={type} />
          <SubCategoryModal />
        </div>
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
  );
};

export default Categories;

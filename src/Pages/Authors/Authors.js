import { useEffect, useState } from 'react';
import { Typography, Button, Tag, Image } from 'antd';
import { useHistory } from 'react-router';
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from '../../Components/Table/DataTable';
import Layout from './../../Layout/LayoutMain';
import { GetAllAuthors } from '../../redux';
import { columns, getData } from './authersHooks';

const Authors = () => {
  const [data, setData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const AllAuthors = useSelector((state) => state.AuthorReducer.AllAuthors);

  useEffect(() => {
    dispatch(GetAllAuthors());
  }, []);

  console.log(AllAuthors);

  useEffect(() => {
    let authers=[];
    if(AllAuthors){
      AllAuthors?.map((data,index)=>{
        console.log("dta here-->",data)
        authers.push({
          srno: index + 1,
          pic: <Image height={80} width={90} src={data.profileImage} />,
          firstname: data?.firstname,
          lastname: data?.lastname,
          penName: data?.penName,
          died: data?.died,
          nationality: data?.nationality,
          firstPublishDate: data?.firstPublishDate,
          position: data?.position,
          income: data?.income,
          phone: data?.phone,
          email: data?.email,
          designation: data.designation,
           actions: (
          <div className='actions-buttons'>
            <Button
              shape={'circle'}
              icon={<EyeFilled />}
              onClick={() => history.push(`/author/${data._id}`)}
            />
            <Button
              shape={'circle'}
              onClick={() =>
                history.push({
                  pathname: '/add-author',
                  state: data,
                })
              }
              icon={<EditFilled />}
            />
            {/* <Button
              shape={"circle"}
              icon={<DeleteFilled className="color-red" />}
            /> */}
          </div>
        ),  
          })
      })
      setData(authers);
    }
 

      
  }, [AllAuthors]);

  
  return (
    <Layout active={'authors'}>
      <div className='white-card'>
        <div className='justify-between'>
          <Typography.Title level={2}>Authors List</Typography.Title>
          <Button
            type='primary'
            icon={<PlusCircleFilled />}
            onClick={() => history.push('add-author')}
          >
            Add Author
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={data}
          width={1200}
          Search={true}
          SearchRoute={'Authors'}
          loader={AllAuthors === null ? true : false}
        />
      </div>
    </Layout>
  );
};

export default Authors;

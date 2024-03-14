import { useState, useEffect } from 'react';
import { Typography, Button, Image } from 'antd';
import moment from 'moment';

import { useParams, useHistory, Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { publicAPI, privateAPI } from '../../API/index';
import Layout from './../../Layout/LayoutMain';

const ViewAuthor = () => {
  const [AuthorData, setAuthorData] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    const res = await privateAPI.get(`/author/get-author/${id}`);
    if (res) {
      console.log(res.data);
      setAuthorData(res.data);
    }
  }, []);

  return (
    <Layout active='authors'>
      <div className='View-book'>
        <Button
          shape={'circle'}
          icon={<ArrowLeftOutlined />}
          onClick={() => history.go(-1)}
          style={{ marginBottom: '10px' }}
        />
        <Typography.Title level={3}></Typography.Title>
        <div className='info-sec'>
          <Image height={120} src={AuthorData?.profileImage} />
          <div className='item'>
            <h4>First Name :</h4>
            <p> {AuthorData?.firstname} </p>
          </div>
          <div className='item'>
            <h4>Last Name :</h4>
            <p> {AuthorData?.lastname} </p>
          </div>
          <div className='item'>
            <h4>Pen Name :</h4>
            <p> {AuthorData?.penname} </p>
          </div>
          <div className='item'>
            <h4>Died :</h4>
            <p> {AuthorData?.died} </p>
          </div>
          <div className='item'>
            <h4>Nationality :</h4>
            <p> {AuthorData?.nationality} </p>
          </div>
          <div className='item'>
            <h4>First Published Date :</h4>
            <p> {AuthorData?.firstpublishdate} </p>
          </div>
          <div className='item'>
            <h4>Position :</h4>
            <p> {AuthorData?.position} </p>
          </div>
          <div className='item'>
            <h4>Income :</h4>
            <p> {AuthorData?.income} </p>
          </div>
          <div className='item'>
            <h4>Author Add on :</h4>
            <p> {moment(AuthorData?.CreatedAt).format('MMM Do YYYY')} </p>
          </div>
          <div className='item'>
            <h4>Email :</h4>
            <p> {AuthorData?.email} </p>
          </div>
          <div className='item'>
            <h4>Designation :</h4>
            <p> {AuthorData?.designation} </p>
          </div>
          <div className='link-item'>
            <h4>Books :</h4>
            {AuthorData?.books?.map((book) => (
              <li>
                <Link to={`/material/${book._id}`}> {book.name} </Link>
              </li>
            ))}
          </div>
        </div>
        <div className='Desc'>
          <h4>Description :</h4>
          <p> {AuthorData?.description} </p>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAuthor;

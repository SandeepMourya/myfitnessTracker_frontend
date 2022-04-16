import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../UI/Navbar';
import ArticleCard from './ArticleCard';
import Map from './Map';
import classes from './Blogs.module.css'
import icon1 from "../../assets/image1.png"
import icon2 from "../../assets/image2.png"
import icon3 from "../../assets/image3.png"

const tempdata = [
    {
        imgSrc:'image1.jpg',
        title:"Health",
        data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit, neque id mollis pulvinar, nulla libero dictum nisi, at eleifend velit ex ut augue. In pellentesque urna lectus, sed mollis"
    },
    {
        imgSrc:'image2.jpg',
        title:"Food",
        data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit, neque id mollis pulvinar, nulla libero dictum nisi, at eleifend velit ex ut augue. In pellentesque urna lectus, sed mollis"
    },
    {
        imgSrc:'image3.jpg',
        title:"LifeStyle",
        data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit, neque id mollis pulvinar, nulla libero dictum nisi, at eleifend velit ex ut augue. In pellentesque urna lectus, sed mollis"

    }
]



const Blogs = () => {
  const nav = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('token')){
        nav('/Error')
      }
},[])
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.navbar}>
          <Navbar></Navbar>
        </div>
        <div className={classes.content}>
          <div className={classes.cardContainer}>
              <ArticleCard Data={tempdata[0]} icon={icon1}></ArticleCard>
              <ArticleCard Data={tempdata[1]}icon={icon2}></ArticleCard>
              <ArticleCard Data={tempdata[2]}icon={icon3}></ArticleCard>

          </div>
            <div className={classes.mapContainer}>
                <Map></Map>
            </div>

        </div>

      </div>

    </>
  )
}

export default Blogs;

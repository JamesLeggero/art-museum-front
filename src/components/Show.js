import React from "react"
import Jumbotron from 'react-bootstrap/Jumbotron'


export default function Show(props){



     return(
          <div>
               {Object.keys(props.myShownPiece).length > 0 &&
               <div>
               <h1>{props.myShownPiece.title}</h1>
               <h3>{`(${props.myShownPiece.artist}, ${props.myShownPiece.dated})`}</h3>
               </div>
               }
              


               <img style={{maxWidth: '200px'}} src={
                    (!props.myShownPiece.img || props.myShownPiece.img === undefined) && Object.keys(props.myShownPiece).length > 0 ? 
                    props.ComingSoon :
                    props.myShownPiece.img
                    } 
                    alt={props.myShownPiece.title}/>
               <h2>{props.myShownPiece.culture}</h2>
               <p>{props.myShownPiece.personalThoughts}</p>
               {Object.keys(props.myShownPiece).length > 0 && 
               <div>
               <form onSubmit={props.handleThoughtsSubmit} id={props.myShownPiece._id} value={props.personalThoughts}>
                    <input type='textarea' name='personalThoughts' id='thoughtForm' placeholder='Add your personal thoughts here' />
                    <input type='submit' value='Update your Thoughts'/>

               </form>
               <form onSubmit={props.handleDelete} id={props.myShownPiece._id}>
                    <input type='submit' value='DELETE ITEM' />
               </form>
               </div>
               }
          </div>
                    
          
     )
} 
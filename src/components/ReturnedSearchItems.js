import React from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'



export default function ReturnSearchItems(props) {


    return (
        
        <div>
            <div>
            
            {Object.keys(props.allReturnedObjects).length > 0 &&
            <div style={{display:"flex", justifyContent:"space-around", marginBottom:"25px", fontSize:"12px"}}>

                <form onSubmit={props.handlePrevious}>
                   <input style={{padding: '5px', backgroundColor:"rgba(14, 69, 86, 0.9)", color:"ghostwhite", borderRadius: "4px", border:"1px solid"}} type="submit" value="PREVIOUS" />

               </form>

                <h3 style={{fontSize:"16px"}}>PAGE {props.allReturnedObjects.info.page} of {props.allReturnedObjects.info.pages}</h3>
                
               
                <form onSubmit={props.handleNext}>
                    <input style={{padding: '5px', backgroundColor:"rgba(14, 69, 86, 0.9)", color:"ghostwhite", borderRadius: "4px", border:"1px solid"}} type='submit' value='NEXT'/>
                </form>
                </div>
            }
           </div>   

            <CardColumns style={{marginLeft:"150px"}}>

                {Object.keys(props.allReturnedObjects).length > 0 &&
                


                    props.allReturnedObjects.records.map((object, i) => {
                        return (


                            <Card className="" style={{ width: '22rem' }} key={i}>
                                {/* <Card.Img className="" variant="top" src={
            object.primaryimageurl.value ?
            './img/imageComingSoon.png' :
            
            `${object.primaryimageurl}`
            } alt='art piece'/> */}

          {
          object.primaryimageurl ?
          <Card.Img className='' variant='top' src={`${object.primaryimageurl}`} alt='art piece' /> :
          <Card.Img className='' variant='top' src={props.ComingSoon} alt='art piece' />
          }

          {/* {console.log(object.title)} */}
          
          <Card.Body>
          <Card.Title>{object.title}</Card.Title>
          <Card.Text>{object.culture}</Card.Text>
          
          <Button variant="primary" onClick={props.handleAddToCollection} title={object.title} id={object.id} culture={object.culture} classification={object.classification} type='button'>Add to Collection</Button>
          </Card.Body>
          </Card>
          
          
        )})

      }
      </CardColumns>
      </div>
    )

}
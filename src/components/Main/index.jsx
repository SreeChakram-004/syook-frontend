import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import _, { set } from 'lodash';
import { Button, Card, Divider, Image, Placeholder } from 'semantic-ui-react';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [loading,setLoading]=useState(false);
	const [cards,setCards]=useState()
	const [vote,setVote]=useState(0)

	// const cards =[
	// 	{
	// 	  "id": 1,
	// 	  "dishName": "Lasagne",
	// 	  "description": "Breaded fried chicken with waffles, and a side of maple syrup.",
	// 	  "image": "https://loremflickr.com/300/300/food"
	// 	},
	// 	{
	// 	  "id": 2,
	// 	  "dishName": "Pho",
	// 	  "description": "Three eggs with cilantro, tomatoes, onions, avocados and melted Emmental cheese. With a side of roasted potatoes, and your choice of toast or croissant.",
	// 	  "image": "https://loremflickr.com/300/300/food"
	// 	},
	//   ]

	  useEffect(()=>{
		  fetch('https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json')
		       .then(response =>response.json())
			   .then(data=>setCards(data))

	  })


	 const handleLoadingClick = () => {
		setLoading(true)
		setTimeout(() => {
		  setLoading(false)
		}, 3000)
	  }

	

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Syook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>

			<div>
        <Divider />
		{vote}
			<Card.Group doubling itemsPerRow={3} stackable>
          {_.map(cards, (card) => (
            <Card key={card.header}>
              {loading ? (
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                // <Image src={`https://robohash.org/${card.id}?set=set2&size=180x180`} />
				<Image src={card.image} />
              )}

              <Card.Content>
                {loading ? (
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length='very short' />
                      <Placeholder.Line length='medium' />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                  </Placeholder>
                ) : (
                  <>
                    <Card.Header>{card.header}</Card.Header>
                    <Card.Meta>{card.dishName}</Card.Meta>
                    <Card.Description>{card.description}</Card.Description>
                  </>
                )}
              </Card.Content>

              <Card.Content extra>
                <Button disabled={loading} onClick={()=>card.id===1 ? setVote(vote+1) : setVote(vote+1) } primary>
                  Vote
                </Button>
                <Button disabled={loading} onClick={()=>card.id===1 ? setVote(vote-1) : setVote(vote-1)} >Unvote</Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
			</div>

		</div>
	);
};

export default Main;

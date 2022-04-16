

export default function Map() {
    return (
        <>
            <h1
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "2%",
                    color: "Black",
                    fontFamily: "'Baloo Bhaijaan 2'",
                    fontWeight: 'lighter'
                }}
                
            >
                Healthy places in Mumbai
            </h1>
            <div style={{
                border:"1px solid black",
                overflow:"hidden",
                boxShadow: "0px -1px 5px 0px rgba(0,0,0,0.4)"

            }}>
                <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d60283.01972358211!2d72.8316390250763!3d19.208792982550396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shealthy%20food%20places%20in%20mumbai!5e0!3m2!1sen!2sin!4v1643492793863!5m2!1sen!2sin" width="1000" height="520" loading="lazy"></iframe>
            </div>

        </>
    );
}
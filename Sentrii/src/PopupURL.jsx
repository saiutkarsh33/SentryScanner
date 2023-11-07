import {
  Container,
  Button,
  Paper,
  Overlay,
} from "@mantine/core";


// 0x6982508145454Ce325dDbE47a25d4ec3d2311933




export default function PopupURL() {
       

  return (
    <Container size="xs" style={{ backgroundColor: '#FF0000', padding: '10px', borderRadius: '0px' }}>
      <Overlay
            gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%)"
            opacity={0.3}
            zIndex={0}
          />
   <Paper 
    padding="xs" 
    radius="sm" 
    style={{ 
      backgroundColor: '#FF0000',
      display: 'flex', // Set display to flex
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center', // Center children horizontally
      textAlign: 'center' // This centers the text inside the children
    }}
  >
  
        <h1 style={{ fontFamily: "'Open Sans', sans-serif", marginBottom: '20px', textAlign: 'center' }}>Sentrii Website Scanner</h1>
          
          

    
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '25px', fontWeight: 'normal', textAlign: 'center', color: 'white', 
  paddingBottom: '10px'  }}>
      Warning! The site you are trying to access was flagged as suspicious.
    </p>

    <Button variant="light" color="blue" style={{ backgroundColor: '#0056b3', color: 'white', borderRadius: '0' }}> {/* Set borderRadius to 0 */}
       Close
      </Button>

      </Paper>
    </Container>
  );
}
import { useEffect, useState } from "react";
import { getProperties } from "../../services/propertyService";
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText, Alert, CircularProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PropertyList = () => {

    const [properties, setProperties] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading
                const data = await getProperties();
                setProperties(data);
            } catch (error) {
                setError("Failed to load properties. Please try again later.");
            } finally {
                setLoading(false); // Stop loading whether success or failure
            }
        };

        fetchData();

    }, []);

    if (loading) return <CircularProgress />; // Show a loading spinner
    if (error) return <Alert severity="error">{error}</Alert>; // Show an error message


    return (

        <div>
            {properties.map((property, index) => (

                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h5">{property.propertyName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography><strong>Features:</strong> {property.features.join(", ")}</Typography>
                        <Typography><strong>Highlights:</strong> {property.highlights.join(", ")}</Typography>                                             
                        <Typography>
                            <strong>Transportation:</strong>{" "}
                            {property.transportation.length > 0 ? (
                                property.transportation
                                    .filter(t => t && t.type) // Ensure t exists and has a type
                                    .map((t, i) => (
                                        <span key={i}>
                                            {`${t.type} ${t.line ? `- ${t.line}` : ""} (${t.distance})`}
                                            {i < property.transportation.length - 1 ? ", " : ""}
                                        </span>
                                    ))
                            ) : (
                                "No transportation info available"
                            )}
                        </Typography>
                        <Typography><strong>Spaces:</strong></Typography>
                        <List>
                            {property.spaces.map((space, spaceIndex) => (
                                <Accordion key={spaceIndex}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="subtitle1"><strong>{space.spaceName}</strong></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>                                        
                                        <List>
                                            {space.rentRoll.map((rentroll, rIndex) => (
                                                <ListItem key={rIndex}>
                                                    <ListItemText primary={`${rentroll.month}: $${rentroll.rent}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default PropertyList;

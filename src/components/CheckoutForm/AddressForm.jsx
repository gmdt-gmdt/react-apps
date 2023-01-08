import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  // Fetch shipping options
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country,
        region,
      }
    );
    setShippingOptions(options);
    setShippingOption(options[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            test({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <form
            onSubmit={methods.handleSubmit((data) =>
              test({
                ...data,
                shippingCountry,
                shippingSubdivision,
                shippingOption,
              })
            )}
          ></form>
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address" label="Address name" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="ZIP / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {Object.entries(shippingSubdivisions).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {`${option.description} - ${option.price.formatted_with_symbol}`}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;

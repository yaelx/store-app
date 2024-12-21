"use client";
import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { useProductContext } from "../context/ProductsContext";
import { Product } from "../types/Product";

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.button.add,
  borderRadius: 5,
  width: 50,
  height: 35,
  color: theme.palette.common.white,
  fontWeight: 600,
  cursor: "pointer",
  alignSelf: "flex-end",
}));

const StyledLabel = styled(InputLabel)(() => ({
  marginTop: "10px",
}));

const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  description: Yup.string().min(2, "Too Short!").max(200, "Too Long!"),
  price: Yup.number().positive().required("Required"),
});

export const ProductForm = () => {
  const { addProduct, openProductForm, setOpenProductForm } =
    useProductContext();

  const saveProduct = async (values: Omit<Product, "id">) => {
    console.log("saveProduct: ", values);
    addProduct({
      ...values,
      creation_date: new Intl.DateTimeFormat().format(new Date()),
      url: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "80%",
        flex: 1,
        flexDirection: "column",
        marginTop: 2,
      }}
    >
      {openProductForm && (
        <Paper elevation={3}>
          <Typography
            variant="subtitle1"
            sx={{ paddingLeft: 10, paddingTop: 2 }}
          >
            Add new product
          </Typography>

          <Formik
            initialValues={{
              name: "",
              description: "",
              price: 0,
              creation_date: "",
            }}
            validationSchema={productSchema}
            onSubmit={async (values, actions) => {
              console.log(values);
              saveProduct(values)
                .then(() => {
                  actions.setSubmitting(false);
                  actions.resetForm();
                  setOpenProductForm(false);
                })
                .catch(() => {
                  actions.setSubmitting(false);
                });
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form
                style={{
                  paddingTop: 5,
                  paddingLeft: 20,
                  display: "flex",
                  width: "80%",
                  flex: 1,
                  flexDirection: "column",
                  height: 400,
                }}
              >
                <StyledLabel htmlFor="name">Name</StyledLabel>
                <Field name="name" />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}

                <StyledLabel htmlFor="description">Description</StyledLabel>
                <Field name="description" as="textarea" />
                {errors.description && touched.description ? (
                  <div>{errors.description}</div>
                ) : null}

                <StyledLabel htmlFor="price">Price</StyledLabel>
                <Field name="price">
                  {({ field, meta }: FieldProps<number>) => (
                    <div>
                      <OutlinedInput
                        id="price"
                        type="number"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        size="small"
                        sx={{
                          width: 80,
                          padding: 0,
                          paddingLeft: 1,
                          margin: 0,
                        }}
                        {...field}
                      />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>

                <SaveButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </SaveButton>
              </Form>
            )}
          </Formik>
        </Paper>
      )}
    </Box>
  );
};

export default ProductForm;

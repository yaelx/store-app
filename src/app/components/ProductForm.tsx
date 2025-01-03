"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import {
  Box,
  CardMedia,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useProductContext } from "../context/ProductsContext";
import { Product } from "../types/Product";
import ActionButton from "./ActionButton";
import { useProductFormContext } from "../context/ProductFormContext";

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
  const {
    addProduct,
    //openProductForm,
    //setOpenProductForm,
    updateProduct,
    //draftProduct,
  } = useProductContext();

  const { openProductForm, setOpenProductForm, draftProduct, resetDraft } =
    useProductFormContext();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const initialState = {
    name: "",
    description: "",
    price: 0,
    creation_date: "",
  };

  const saveProduct = async (
    values: Partial<Product> | Omit<Product, "id">
  ) => {
    console.log("add Product: ", values);
    if (draftProduct) {
      await updateProduct({
        id: draftProduct.id as number,
        ...values,
        url: values.url || draftProduct.url,
      } as Partial<Product> & { id: string });
      resetDraft();
    } else {
      addProduct({
        ...values,
        creation_date: new Intl.DateTimeFormat().format(new Date()),
        url: "https://plus.unsplash.com/premium_photo-1700145523789-764a456e6034?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      } as Omit<Product, "id">);
    }
  };

  const onClose = () => {
    setOpenProductForm(false);
  };

  if (!openProductForm) return null;

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
        <Paper elevation={3} sx={{ height: 500 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ paddingLeft: 3, paddingTop: 2, fontWeight: 600 }}
            >
              {draftProduct
                ? `${draftProduct.name} details`
                : "Add a new product"}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Formik
            key={draftProduct ? draftProduct.id : "new"}
            initialValues={draftProduct || initialState}
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
            {({ errors, touched, isSubmitting, setFieldValue, resetForm }) => (
              <Form
                style={{
                  paddingTop: 5,
                  paddingBottom: 10,
                  paddingLeft: 20,
                  display: "flex",
                  width: "80%",
                  flex: 1,
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <StyledLabel htmlFor="url">Image</StyledLabel>
                <Field name="url">
                  {() => (
                    <Box
                      sx={{ display: "flex", flexDirection: "row", gap: "6px" }}
                    >
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            setSelectedImage(file);
                            const previewURL = URL.createObjectURL(file);
                            setPreviewImage(previewURL);
                            setFieldValue("url", previewURL);
                          }
                        }}
                        style={{
                          padding: "5px",
                          border: "1px solid rgba(0, 0, 0, 0.6)",
                          borderRadius: "5px",
                          width: "100%",
                        }}
                      />
                    </Box>
                  )}
                </Field>
                {previewImage && (
                  <CardMedia
                    component="img"
                    sx={{ width: 120, height: 100 }}
                    image={previewImage}
                    alt={"Preview"}
                  />
                )}

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
                          padding: "0px 8px",
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

                <ActionButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </ActionButton>
              </Form>
            )}
          </Formik>
        </Paper>
      )}
    </Box>
  );
};

export default ProductForm;

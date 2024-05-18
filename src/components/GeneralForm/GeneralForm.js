import React from "react";
import { View, Button, Text } from "react-native";
import { Formik } from "formik";
import CustomizeTextInput from "../CustomizeTextInput/CustomizetextInput";
import { parseToForm } from "../../helps/parseToForm";
import CustomizeButton from "../CustomizeButton/CustomizeButton";
import ErrorText from "../ErrorText/ErrorText";
import CustomizeRadio from "../CustomizeRadio/CustomizeRadio";
import * as STRINGS from "../../constants/strings";

function GeneralForm({
  fields,
  handleData,
  titleSubmitBtn,
  isVertical = false,
  isSearch,
  backBtn,
  goBack,
  isSmall,
}) {
  const fieldRender = (field, key, { handleChange, values, errors }) => {
    let element = null;

    switch (field.type) {
      case "number":
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={false}
              numericInput={true}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <ErrorText content={errors[field.name]} />}
            </View>
          </View>
        );
        break;
      case "time":
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={false}
              numericInput={"time"}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <ErrorText content={errors[field.name]} />}
            </View>
          </View>
        );
        break;
      case "text":
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={false}
              isSearch={isSearch}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <ErrorText content={errors[field.name]} />}
            </View>
          </View>
        );
        break;
      case "email":
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={false}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <ErrorText content={errors[field.name]} />}
            </View>
          </View>
        );
        break;
      case "password":
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={true}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <ErrorText content={errors[field.name]} />}
            </View>
          </View>
        );
        break;
      case "radio":
        element = (
          <View className="relative flex flex-row justify-start">
            <CustomizeRadio
              key={key}
              value={values[field.name]}
              options={field.options}
              onChangeText={handleChange(field.name)}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <ErrorText content={errors[field.name]} />}
            </View>
          </View>
        );
        break;
      default:
        element = (
          <View className="relative">
            <CustomizeTextInput
              key={key}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChangeText={handleChange(field.name)}
              secureTextEntry={false}
            />
            <View className="absolute -bottom-6">
              {errors[field.name] && <ErrorText content={errors[field.name]} />}
            </View>
          </View>
        );
        break;
    }

    return element;
  };

  return (
    <Formik
      initialValues={parseToForm(fields)}
      onSubmit={(values) => handleData(values)}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values) => {
        const errors = {};
        fields.map((field) => {
          if (!values[field.name] && field.isRequired) {
            errors[field.name] = `Vui lòng nhập ${field.label.toLowerCase()}.`;
          } else if (
            field.type === "email" &&
            !/\S+@\S+\.\S+/.test(values[field.name])
          ) {
            errors[field.name] = "Địa chỉ email không hợp lệ.";
          } else if (
            field.minLength &&
            values[field.name].length < field.minLength
          ) {
            errors[
              field.name
            ] = `${field.label} phải có ít nhất ${field.minLength} ký tự.`;
          }
          return;
        });
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View
          className={`w-full ${
            isVertical && "flex flex-row justify-between items-center space-x-2"
          }`}
        >
          {fields.map((field, key) => (
            <View key={key} className={`${isVertical ? "w-3/4 my-4" : "my-4"}`}>
              {fieldRender(field, key, { handleChange, values, errors })}
            </View>
          ))}
          {backBtn ? (
            <View className="w-full flex flex-row justify-center">
              <View className="w-1/2">
                <CustomizeButton
                  isSearch={isSearch}
                  title={titleSubmitBtn}
                  onPress={handleSubmit}
                />
              </View>
              <View className="w-1/2 ml-2">
                <CustomizeButton
                  isSearch={isSearch}
                  title={STRINGS.close}
                  onPress={goBack}
                />
              </View>
            </View>
          ) : (
            <View className={`${isVertical ? "w-1/4" : "mt-6 mb-3"}`}>
              <View
                className={`${
                  isSmall ? "w-full flex flex-row justify-center" : "w-full"
                }`}
              >
                <View className={`${isSmall ? "w-1/4" : "w-full"}`}>
                  <CustomizeButton
                    isSearch={isSearch}
                    title={titleSubmitBtn}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </Formik>
  );
}

export default GeneralForm;

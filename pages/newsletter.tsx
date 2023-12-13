import Box from "@src/components/Box/Box";
import Button from "@src/components/Button/Button";
import Image from "@src/components/Image/Image";
import Text from "@src/components/Text/Text";
import { BaseComponent } from "@src/theme/BaseComponent";
import React, { useState } from "react";

interface NewsletterTextFieldProps {
  placeholder?: string;
  value?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Poderia muito bem usar React-Hook-Form mas isso é pra estudo!
function useForm({ initialValues }) {
  const [values, setValues] = useState(initialValues);

  return {
    values,
    handleChange(evento) {
      const { name, value } = evento.target;
      console.log(name, value);
      setValues({
        ...values,
        [name]: value,
      });
    },
  };
}

export default function NewsletterScreen() {
  const form = useForm({
    initialValues: {
      emailNewsletter: "",
    },
  });
  return (
    <Box
      styleSheet={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          console.log("Estamos enviando os dados do formulário!");

          // Validar
          if (!form.values.emailNewsletter.includes("@")) {
            alert("Você precisa informar um email valido!");
            return;
          }
          alert(
            "Você foi cadastrado com sucesso! Cheque seu email para garantir"
          );

          // Enviar para o servidor o email da pessoa
          // fetch("")
        }}
      >
        <Box
          styleSheet={{
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            padding: "16px",
          }}
        >
          <Image
            src="https://github.com/maicxn.png"
            alt="Foto do Maicxn"
            styleSheet={{
              borderRadius: "100%",
              width: "150px",
              margimBottom: "16px",
            }}
          ></Image>
          <Text variant="heading2">Newsletter</Text>
          <NewsletterTextField
            placeholder="Informe seu email"
            name="emailNewsletter"
            value={form.values.emailNewsletter}
            onChange={form.handleChange}
          />{" "}
          <Button fullWidth styleSheet={{ marginTop: "16px" }}>
            Cadastrar
          </Button>
        </Box>
      </form>
    </Box>
  );
}

function NewsletterTextField(props: NewsletterTextFieldProps) {
  return (
    <Box
      styleSheet={{
        maxWidth: "300px",
        width: "100%",
      }}
    >
      <BaseComponent
        as="input"
        {...props}
        styleSheet={{
          border: "1px solid rgb(195,195,195)",
          borderRadius: "4px",
          padding: "8px",
          width: "100%",
        }}
      />
    </Box>
  );
}

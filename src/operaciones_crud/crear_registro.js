const handleAdd = async () => {
    if (inputValue.trim()) {
      try {
        await addDoc(collection(db, "datos"), {
          value: inputValue,
        });
        setInputValue(""); // Limpiar el campo de entrada
        fetchData(); // Recargar los datos
      } catch (e) {
        console.error("Error agregando documento: ", e);
      }
    }
  };
  
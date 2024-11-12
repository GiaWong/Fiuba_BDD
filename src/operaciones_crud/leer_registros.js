const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "datos"));
    const dataList = [];
    querySnapshot.forEach((doc) => {
      dataList.push({ id: doc.id, ...doc.data() });
    });
    setData(dataList);
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
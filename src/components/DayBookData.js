import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function DayBookData() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token == undefined) {
      navigate("/");
    }
  }, []);
  const { enteredDate } = useParams();
  const [dataa, setData] = useState([]);
  const [fomatedData, setfomatedData] = useState([]);

  useEffect(() => {
    const fetchApiData = async () => {
      // const response1 = await fetch("http://localhost:5000/api/borrow/")
      const response1 = await fetch(window.backendUrl + "borrow/")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Request failed with status: " + response.status);
          }
        })
        .then((data) => {
          setData(data);
          return data;
        })
        .then((data) => {
          function fetchDataByDate(date, d) {
            try {
              // Filter data where DateBorrow matches the received date
              const matches = [];
              const byDateBorrow = d.filter((user) => {
                const name = user.name;

                user.amountArray.forEach((item) => {
                  let temp = convertDateFormat2(item.DateBorrow);
                  temp = new Date(temp).toLocaleDateString();
                  if (temp === date) {
                    const obj = {
                      date: temp,
                      TotalBorrow: item.TotalBorrow,
                      name: name,
                    };
                    matches.push(obj);
                  }
                });

                return matches.length > 0;
              });

              // Filter data where Transactions.date matches the received date
              // const matches = user.amountArray.filter((item) =>
              // item.Transactions.some(
              //   (transaction) => transaction.date === date
              // )
              // );
              // return matches.length > 0;
              const matches1 = [];
              const byTransactionDate = d.filter((user) => {
                const name = user.name;

                user.amountArray.forEach((item) => {
                  item.Transactions.some((transaction) => {
                    let temp = convertDateFormat2(transaction.date);
                    temp = new Date(temp).toLocaleDateString();
                    if (temp === date) {
                      const obj = {
                        date: temp,
                        amount: transaction.amount,
                        name: name,
                      };
                      matches1.push(obj);
                    }
                  });
                });

                return matches.length > 0;
              });

              // Extract and format the data as needed
              const formattedData = {
                byDateBorrow: matches,
                byTransactionDate: matches1,
              };

              return formattedData;
            } catch (error) {
              console.error("Error fetching data:", error);
              throw error;
            }
          }

          setfomatedData(
            fetchDataByDate(new Date(enteredDate).toLocaleDateString(), data)
          );
          //console.log(fomatedData);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    };

    fetchApiData();
  }, []);

  useEffect(() => {
    // console.log(dataa);
    // console.log(fomatedData);
  }, [fomatedData]);

  function convertDateFormat(inputDate) {
    var parts = inputDate.split("-");
    var formattedDate = parts[1] + "/" + parts[2] + "/" + parts[0];
    return formattedDate;
  }
  function convertDateFormat2(inputDate) {
    var parts = inputDate.split("-");
    var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    return formattedDate;
  }

  return (
    <div>
      <div className="Bbody">
        <div className="Bcontainer example">
          <div className="Bheading">
            <h1 className="font-medium underline" style={{ fontSize: "35px" }}>
              Day Book-
              <span style={{ fontSize: "35px" }}>
                {convertDateFormat2(enteredDate)}
              </span>
            </h1>
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          </div>
          <div className="Bamounts">
            <ul className="ull">
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Name
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Borrow Amount
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Lend Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fomatedData.length === 0 ? (
                    <>
                      <td>loading</td>
                    </>
                  ) : (
                    <>
                      {fomatedData.byDateBorrow.map((arr) => {
                        return (
                          <tr>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {arr.name}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {arr.TotalBorrow}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              ----
                            </td>
                          </tr>
                        );
                      })}
                      {fomatedData.byTransactionDate.map((arr) => {
                        return (
                          <tr>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {arr.name}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              ----
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {arr.amount}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayBookData;

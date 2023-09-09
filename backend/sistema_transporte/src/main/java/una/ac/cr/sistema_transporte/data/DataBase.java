/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package una.ac.cr.sistema_transporte.data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author josep
 */
public class DataBase {
 
     
      private final static String USER = "root";
        private final static String PASSW = "";

        private final static String DATA = "bdexamenprograv";
        private final static String SERVER = "localhost:";
        private final static String URL = "jdbc:mysql://" + SERVER + "3306/" + DATA;
        private Connection conexion;

        protected Connection getConexion() {
            try {
                if (conexion == null) {
                    Class.forName("com.mysql.cj.jdbc.Driver");

                }


            } catch (ClassNotFoundException ex) {
                Logger.getLogger(DataBase.class.getName()).log(Level.SEVERE, null,ex);

            }
            try {

                if (conexion == null) {
                    conexion = DriverManager.getConnection(URL, USER, PASSW);
                }


            } catch (SQLException ex) {
                Logger.getLogger(DataBase.class.getName()).log(Level.SEVERE, null,ex);

            }
            System.out.println(conexion == null ? "no conecto" : "Conecto");
            return conexion;

        }


    
}

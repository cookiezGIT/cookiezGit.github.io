<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Default.aspx.vb" Inherits="Web._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
    
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="/propuestas/css/materialize.css">
</head>
<body>
    <form id="form1" runat="server">
      <div id="divPropuestas" style="display:block">
        <div class="file-field input-field">
          <div class="btn">
            <span>Adjuntar</span>
            <asp:FileUpload ID="UplResEjectivo" runat="server" />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" placeholder="Resumen ejecutivo">
          </div>
        </div>

      <div class="file-field input-field">
        <div class="btn">
          <span>Adjuntar</span>
          <asp:FileUpload ID="UplResEvaluar" runat="server" />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" placeholder="Resumen para evaluar">
        </div>
      </div>
      </div>
      
      <div id="divFotos" style="display:none">
         <table>             
            <tr>
               <td width="180">Ajuntar Fotografia</td>
               <td width="150"><asp:FileUpload ID="UplResFoto" runat="server" /></td>
            </tr>                 
         </table>
      </div>
      
      
         
      <div style="display:none">    
         <asp:Button ID="btnGuardar" runat="server" Text="Button" />
         <input id="btnValidar" type="button" value="button" onclick="Archivo()" />
      </div>
         <asp:HiddenField ID="hdlId_Registro" runat="server" />
         <asp:HiddenField ID="hdlFl_Tipo"  runat="server" />
     
         <asp:HiddenField ID="hdlUplResEje" runat="server" Value="0" />
         <asp:HiddenField ID="hdlUplResEva" runat="server" Value="0" />
         

     
  <script type="text/javascript">

    function Respuesta(Res,Men) {
        top.Respuesta(Res, Men);
    }


    function Archivo() {
        var NuEj = parseInt(document.getElementById("<%=hdlUplResEje.ClientID%>").value);
        var NuEv = parseInt(document.getElementById("<%=hdlUplResEva.ClientID%>").value);
        
        
        var UplResEje = document.getElementById('UplResEjectivo');
        var UplEje    = UplResEje.files[0];

        var UplResEva = document.getElementById('UplResEvaluar');
        var UplEva = UplResEva.files[0]; 
           

        if (UplEje === undefined) {
            Respuesta(0, "No se selecciono el archivo de resumen ejecutivo ...!");
            return;
        }

        if (UplEva === undefined) {
            Respuesta(0, "No se selecciono el archivo de resumen evaluar ...!");
            return;
        }

        if (UplEje.size > NuEj) {
            Respuesta(0, "El archivo de resumen ejecutivo supera el tamaño permitido ..!");
            return;
        }
        if (UplEje.size > NuEv) {
            Respuesta(0, "El archivo de resumen evaluar supera el tamaño permitido ..!");
            return;
        }
        document.getElementById("<%=btnGuardar.ClientID%>").click();
        return;
    }
    
  
  </script>
  <script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js"></script></form>
    
    
    
</body>
</html>

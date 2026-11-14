import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { useAppDispatch } from '../../Redux/hooks';
import { addProduct } from '../../Redux/slices/productsSlice';
import { useDictionary } from '../../Shared/useDictionary';
import { productSchema } from '../../Validations/productSchema';
import { ApiErrorCode } from '../../types/Enums/ApiErrorCode';
import { getErrorCode } from '../../Utils/api/apiError';
import { Icon } from '../../Shared/Icons';
import Button from '../../Shared/Button';
const Backdrop=styled.div`position:fixed;inset:0;background:rgba(8,18,36,.55);z-index:20;display:flex;justify-content:center;align-items:center;padding:30px;`;
const Panel=styled.div`width:min(720px,100%);max-height:90vh;overflow:auto;background:${({theme})=>theme.colors.surface};border-radius:18px;padding:28px 32px;box-shadow:0 18px 60px rgba(0,0,0,.25);`;
const Head=styled.div`display:flex;align-items:center;justify-content:space-between;margin-bottom:25px;h2{margin:0;font-size:21px;}button{border:0;background:transparent;color:inherit;cursor:pointer;}`;
const Grid=styled.div`display:grid;grid-template-columns:1fr 1fr;gap:18px;`;
const Group=styled.div<{$wide?:boolean}>`grid-column:${({$wide})=>$wide?'1 / -1':'auto'};display:grid;gap:7px;label{font-size:13px;font-weight:600;}input,textarea{width:100%;border:1px solid ${({theme})=>theme.colors.border};background:${({theme})=>theme.colors.background};color:${({theme})=>theme.colors.text};border-radius:9px;padding:11px 13px;font:inherit;}textarea{min-height:90px;resize:vertical;}small{color:${({theme})=>theme.colors.danger};min-height:15px;}`;
const Footer=styled.div`display:flex;gap:12px;margin-top:22px;`;
type Values={title:string;description:string;price:string;category:string;image:string};
export default function CreateProductModal({onClose,onSuccess}:{onClose:()=>void;onSuccess:()=>void}){const d=useDictionary();const dispatch=useAppDispatch();const [error,setError]=useState('');const initial:Values={title:'',description:'',price:'',category:'',image:''};return <Backdrop onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><Panel role="dialog" aria-modal="true" aria-labelledby="product-dialog-title"><Head><h2 id="product-dialog-title">{d.products.addProduct}</h2><button type="button" onClick={onClose} aria-label={d.common.cancel}><Icon name="close"/></button></Head><Formik initialValues={initial} validationSchema={productSchema(d)} onSubmit={async(v,{setSubmitting})=>{setError('');try{await dispatch(addProduct({...v,price:Number(v.price)})).unwrap();onSuccess();}catch(e){setError(d.messages.errors[Object.values(ApiErrorCode).includes(e as ApiErrorCode) ? e as ApiErrorCode : getErrorCode(e)]);}finally{setSubmitting(false)}}}>{({errors,touched,isSubmitting})=><Form><Grid>{([{key:'title',label:d.products.productTitle},{key:'category',label:d.products.category},{key:'price',label:d.products.price},{key:'image',label:d.products.imageUrl},{key:'description',label:d.products.description}] as const).map(({key,label})=><Group key={key} $wide={key==='description'||key==='image'}><label htmlFor={'product-'+key}>{label}</label><Field as={key==='description'?'textarea':'input'} id={'product-'+key} name={key} type={key==='price'?'number':'text'} min={key==='price'?'0.01':undefined} step={key==='price'?'0.01':undefined}/><small role="alert">{touched[key]&&errors[key]?errors[key]:''}</small></Group>)}</Grid>{error&&<p role="alert" style={{color:'crimson'}}>{error}</p>}<Footer><Button type="submit" disabled={isSubmitting}>{isSubmitting?d.common.loading:d.common.save}</Button><Button type="button" $variant="outline" onClick={onClose}>{d.common.cancel}</Button></Footer></Form>}</Formik></Panel></Backdrop>}

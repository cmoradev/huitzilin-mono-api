# Create db-secret

```shell
kubectl create secret generic db-secret -n huitzilin --from-literal=host=host-value --from-literal=port=port-value --from-literal=user=user-value --from-literal=pass=pass-value --from-literal=database=database-value 
```

# Create auth-secret

```shell
kubectl create secret generic auth-secret -n huitzilin --from-literal=secret=secret-value
```